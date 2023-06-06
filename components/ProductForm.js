import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { RotateLoader } from "react-spinners";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
                                    _id,
                                    title:existingTitle,
                                    description:existingDescription,
                                    price:existingPrice,
                                    images:existingImages,
                                    category:assignedCategory,
                                    properties:assignedProperties
    }) {
    const [category, setCategory] = useState(assignedCategory || "");
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [images, setImages] = useState(existingImages || []);
    const [price, setPrice] = useState(existingPrice || "");
    const [goToProducts, setGoToProducts] = useState(false);
    const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const [isUploading,setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    useEffect(() => {
        axios.get("/api/categories").then(result => {
            setCategories(result.data);
        })
    }, []);
    async function saveProduct(ev) {
        ev.preventDefault();

        const data = {title, description, price, images, category, properties:productProperties}
        if(_id) {
            //update product
            await axios.put("/api/products", {...data, _id})
        } else {
            //create product
            await axios.post("/api/products", data);
        }
        setGoToProducts(true);

    }
    if (goToProducts) {
        router.push("/products")
    }
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append("file", file);
            }
            const res = await axios.post("/api/upload", data);
            setImages(oldImages => {
                return[...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    function updateImagesOrder(images) {
        setImages(images);
    }

    const propertiesToFill = [];
    if (category.length > 0 && category) {
      let catInfo = categories.find(({ _id }) => _id === category);
      if (catInfo) {
        propertiesToFill.push(...catInfo.properties);
        while (catInfo?.parent?._id) {
          const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
          if (parentCat) {
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
          } else {
            break;
          }
        }
      }
    }

    function setProductProp(propName, value){
        setProductProperties (prev => {
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            return newProductProps;
        })
    }

    return(
        <form onSubmit={saveProduct}>
            <label>Nome do produto</label>
            <input 
                type="text" 
                placeholder="Insira o nome aqui" 
                value={title}
                onChange={ev => setTitle(ev.target.value)} >
            </input>

            <label>
                Imagens 
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
                <ReactSortable list={images} setList={updateImagesOrder} 
                className="flex flex-wrap gap-2">
                    {!!images?.length && images.map((link) => {
                     return link ? (
                        <div key={link} className="h-28 my-1 shadow-md border p-1 bg-gray-50 rounded-md">
                            <img src={link} alt="" className="rounded-md" />
                        </div>
                    ) : null;
                 })}
                </ReactSortable>

                {isUploading && (
                    <div className="h-28 w-28 flex items-center justify-center">
                        <RotateLoader color="#787878" size={10}/>
                    </div>
                )}
                <label className="cursor-pointer my-1 w-28 h-28 border border-2 flex flex-col items-center justify-center text-center text-gray-400 rounded-md bg-gray-50 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                    </svg>
                    <div>
                    Importar...
                    </div>
                    <input type="file" className="hidden" onChange={uploadImages}></input>
                </label>
            </div>
            <label>Categoria</label>
            <select value={category}
                    onChange={ev => setCategory(ev.target.value)}>
                <option value="">Sem Categoria</option>
                {categories.length > 0 && categories.map(c => (
                    <option value={c._id}>{c.name}</option>
                ))}
            </select>

            {categories.length > 0 && propertiesToFill.map( p => (
                <div className="">
                    <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
                    <div>
                    <select 
                        value={productProperties[p.name]}
                        onChange={ev => setProductProp(p.name, ev.target.value)}>
                        {p.values.map(v => (
                            <option value={v}>{v}</option>
                        ))}
                    </select>
                    </div>
                </div>
            ))}

            <label>Descrição do produto</label>
            <textarea 
                placeholder ="Insira a descrição aqui"
                value={description}
                onChange={ev => setDescription(ev.target.value)} >
            </textarea>
            <label>Preço do produto</label>
            <input 
                type="number" 
                placeholder="Insira o preço aqui"
                value={price}
                onChange={ev => setPrice(ev.target.value)} >
            </input>
            <button type="submit" className="create-new-btn">Salvar</button>
        </form>
    )
}