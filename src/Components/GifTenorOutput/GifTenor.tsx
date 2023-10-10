import {useEffect} from "react";
import '../../tenorAPI/tenorAPI.ts'
import {grabData} from "../../tenorAPI/tenorAPI.ts";

const GifTenor = () => {
    // const [testImg, setTestImg] = useState('')

    useEffect(() => {
        grabData()
    }, [])

    return (
        <div>
            <img className="preview_gif" alt="gif" style={{width: 300, height: 200}}/>
        </div>
    );
};

export default GifTenor;
