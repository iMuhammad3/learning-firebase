import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import movies from "./movies";
import { db, auth, storage } from "./config/firebase";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
    const [movieList, setMovieList] = useState([]);

    // New Movie States
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [isNewMovieAdult, setIsNewMovieAdult] = useState(false);

    // Update Title state
    const [updatedTitle, setUpdatedTitle] = useState("");

    // file upload state
    const [fileUpload, setFileUpload] = useState(null);

    const moviesCollectionRef = collection(db, "movies");

    const onSubmitMovie = async () => {
        try {
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                release_date: newReleaseDate,
                adult: isNewMovieAdult,
                userId: auth?.currentUser?.uid,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteMovie = async id => {
        const movieDoc = doc(db, "movies", id);
        await deleteDoc(movieDoc);
    };

    const updateMovieTitle = async id => {
        const movieDoc = doc(db, "movies", id);
        await updateDoc(movieDoc, {
            title: updatedTitle,
        });
    };

    const uploadFile = async () => {
        if (!fileUpload) return;
        const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, fileUpload);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const getMovieList = async () => {
            // read data from db
            // set movie list from db
            try {
                const data = await getDocs(moviesCollectionRef);
                const filteredData = data.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                console.log(data);
                setMovieList(filteredData);
            } catch (err) {
                console.error(err);
            }
        };
        getMovieList();
    }, [onSubmitMovie]);

    return (
        <div className="[&_input]:border-2 my-10 flex flex-col gap-6">
            <Auth />
            <div className="flex flex-col items-center gap-2 ">
                <input
                    placeholder="Movie title..."
                    onChange={e => setNewMovieTitle(e.target.value)}
                />
                <input
                    placeholder="Release Date..."
                    type="number"
                    onChange={e => setNewReleaseDate(Number(e.target.value))}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isNewMovieAdult}
                        onChange={e => setIsNewMovieAdult(e.target.checked)}
                    />{" "}
                    Adult
                </label>
                <button
                    onClick={onSubmitMovie}
                    className="bg-sky-500 text-white px-4 py-1 rounded-md"
                >
                    Submit movie
                </button>
            </div>
            <ul className="grid grid-cols-4 gap-4 text-center mt-4">
                {movieList.map(movie => {
                    return (
                        <li className="flex flex-col gap-1 py-3">
                            <h1 className="text-xl text-sky-700">
                                {movie.title}
                            </h1>
                            <p className="text-slate-800">
                                Date: {movie.release_date}
                            </p>
                            <input
                                onChange={e => setUpdatedTitle(e.target.value)}
                                placeholder="add new title..."
                            />
                            <button
                                onClick={() => updateMovieTitle(movie.id)}
                                className="bg-green-500 text-white px-4 py-1 rounded-md"
                            >
                                Update title
                            </button>
                            <button
                                onClick={() => deleteMovie(movie.id)}
                                className="bg-red-500 text-white px-4 py-1 rounded-md"
                            >
                                Delete Movie
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div>
                <input
                    type="file"
                    onChange={e => setFileUpload(e.target.files[0])}
                />
                <button onClick={uploadFile}>Upload File</button>
            </div>
        </div>
    );
}

export default App;
