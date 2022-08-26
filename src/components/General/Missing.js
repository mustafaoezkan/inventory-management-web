import { Link } from "react-router-dom";

export default function Missing() {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Sayfa Bulunamadı</p>
            <div className="flexGrow">
                <Link to="/">Ana Sayfaya Dön</Link>
            </div>
        </article>
    );
}