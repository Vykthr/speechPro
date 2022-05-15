import app from "./config";
import data from '../data.json'
import { collection, addDoc, getFirestore, updateDoc, getDocs, getDoc, doc, setDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();

export let words = [];
export let userInfo = [];

export const setUpDb  = async () => {
    return new Promise((resolve, reject) => {
        let count = 0;
        try {
            data.map(async ({ english_audio_path, dharug_audio_path, ...datum }) => {
                const docRef = await addDoc(collection(db, "words"), datum);

                await fetch(`../assets/${english_audio_path}`).then(resp => resp.blob())
                .then(async (blob) => {
                    const fileReader = new FileReader();
                    fileReader.readAsArrayBuffer(blob)
                    fileReader.onload = async function (e) {
                        const file = e.target.result;
                        const englishRef = ref(storage, `audios/${docRef.id}/english.mp3`);
                        const englishTask = await uploadBytes(englishRef, file);
                        const englishAudioUrl = await getDownloadURL(englishRef)
                        
                        await fetch(`../assets/${dharug_audio_path}`).then(resp => resp.blob())
                        .then(async (blob) => {
                            const fileReader = new FileReader();
                            fileReader.readAsArrayBuffer(blob)
                            fileReader.onload = async function (e) {
                                const file = e.target.result;
                                const dharugRef = ref(storage, `audios/${docRef.id}/dharug.mp3`);
                                const dharugTask = await uploadBytes(dharugRef, file);
                                const dharugAudioUrl = await getDownloadURL(dharugRef)
                                
                                await updateDoc(docRef, {
                                    englishAudioUrl,
                                    dharugAudioUrl,
                                    docId: docRef.id
                                });
                                count += 1;
                                console.log(count, data.length)
                                if(count === data.length) {
                                    console.log('completed')
                                    resolve('finished')
                                };
                            };
                        });
                    };
                });


                
            })
        }
        catch(err) {
            reject(err)
        }
    })

}

export const getWords = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const docRef = collection(db, "words");
            const docSnap = await getDocs(docRef);
            words = docSnap.docs.map(doc => doc.data());
            resolve(words);
        }
        catch(err) {
            reject(err)
        }
    })
}

export const loginUser = async (email = '', password = '') => {
    return new Promise(async (resolve, reject) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            const userData = await getUser(user.uid);
            userInfo = userData
            resolve(userData);
        }
        catch(err) {
            reject(err)
        }
    })
}

export const registerUser = async (email = '', password = '', username = '') => {
    return new Promise(async (resolve, reject) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            await setUser({ email, username }, user.uid)
            resolve({ email, username });
        }
        catch(err) {
            reject(err)
        }
    })
}

export const getUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            const user = docSnap.data()
            resolve(user);
        }
        catch(err) {
            reject(err)
        }
    })
}

export const setUser = async (payload, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await setDoc(doc(db, "users", userId), { ...payload, userId });
            resolve({ ...payload, userId });
        }
        catch(err) {
            reject(err)
        }
    })
}

