import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';

function Categories({swal}) {
  const[editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {name, parentCategory}
    if(editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    fetchCategories();
  }

  function editCategory(category){
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  function deleteCategory(category) {
    swal.fire({
      title: 'Você tem certeza?',
      text: `Você realmente deseja deletar a categoria ${category.name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, Deletar!",
      confirmButtonColor: "#991b1b",
      cancelButtonColor: "#9ca3af",
  }).then(async result => {
      if(result.isConfirmed) {
        const {_id} = category;
        await axios.delete("/api/categories?_id="+_id);
        fetchCategories();
      }
  });
  };

  return (
    <Layout>
      <h1>Categories Page</h1>
      <label>{editedCategory ? `Editar Categoria ${editedCategory.name}` : "Nova Categoria"}</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="m-0"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          type="text"
          placeholder={"Nome da Categoria"}
        />
        <select
          className="m-0"
          onChange={(ev) => setParentCategory(ev.target.value)}
          value={parentCategory}
        >
          <option value="">Categoria Primária</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button
          type="submit"
          className="bg-purple-700 text-white border border-black px-2 rounded-md"
        >
          Salvar
        </button>
      </form>
      <table className="basict mt-4">
        <thead>
          <tr>
            <td>Nome da Categoria</td>
            <td>Categoria Primária</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                    <div className="space-x-2 flex align-center">
                    <button onClick={() => editCategory(category)} 
                            className="create-new-btn flex items-center text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                <span>Editar</span>
                        </button>
                        <button 
                          onClick={() => deleteCategory(category)}
                          className="create-new-btn flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            <span>Deletar</span>
                        </button>
                    </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({swal}, ref) => (
  <Categories swal={swal}/>
))