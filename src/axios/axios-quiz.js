import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-c0526-default-rtdb.europe-west1.firebasedatabase.app/'
})