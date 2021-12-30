import { useFormik } from 'formik';
import React, { useCallback, useRef, useState } from 'react'
import { TrashFill } from 'react-bootstrap-icons';
import { Category } from '../../interfaces/category.model'
import categoriesService from '../../services/category.service';
import './CreateCategory.css';

export interface CreateCategoryProps {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CreateCategory: React.FunctionComponent<CreateCategoryProps> = ({ categories, setCategories }) => {
    const [inProgress, setInProgress] = useState(false);

    const deleteCategory = useCallback(async categoryId => {
        try {
            await categoriesService.deleteCategory(categoryId);
            setCategories(categories => categories.filter(c => c.id !== categoryId));
        } catch (exception) {
            alert('Error occured while attempting to delete category');
        };
    }, []);

    const formik = useFormik({
        initialValues: {
            categoryTitle: '',
        },
        onSubmit: async (res) => {
            setInProgress(true);

            try {
                const newCategory = await categoriesService.createNewCategory(res.categoryTitle);
                setCategories(categories => ([...categories, newCategory]));
            } catch (err) {

            } finally {
                setInProgress(false);
            }
        },
    });

    return (
        <div>
            <div className="card p-3 mb-3">
                <table>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Title
                            </th>
                            <th>
                                Author
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(
                                category => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.title}</td>
                                        <td>Author</td>
                                        <td>Edit
                                            <a className="pl-3" onClick={() => deleteCategory(category.id)}>
                                                <TrashFill fill="#dc3545" />
                                            </a>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <h4 className="w-100 mb-0">
                        <input
                            name="categoryTitle"
                            placeholder="Category title"
                            className="category-title input-text w-100 px-3 py-2"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.categoryTitle}
                        />
                    </h4>
                </div>
                <div className="mt-4">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!formik.dirty || !formik.isValid || inProgress}
                    >
                        {inProgress ? 'Creating..' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateCategory
