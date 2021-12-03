import {useState} from 'react';

const Button = () => {


    var last = 0;

    const [quotes, setQuotes] = useState({
        data: '',
        loading: true,
        random: '',
    })

    const [previousQuote, setPreviousQuote] = useState("")

    async function fetchApi() {
        var url = "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json";
        await fetch(url)
            .then(response => response.json())
            .then((res) => {
                setQuotes({
                    data: res,
                    loading: false,
                    random: res[Math.floor(Math.random() * res.length)],
                });
            })
            .then(() => {
                setPreviousQuote(quotes.random)
            })
    }

    // var randomQuote = quotes.data[Math.floor(Math.random() * quotes.data[0].length)];
    const handleSubmit = e => {
        e.preventDefault();
        fetchApi();
        // console.log(Math.floor(Math.random() * quotes.data[0].length));
    }

    const showPrevious = e => {
        e.preventDefault();

        const quote = document.querySelector(".quote");
        quote.innerHTML = previousQuote.quote;
    }
    

    return ( 
        <div className="control">
            <form onSubmit={handleSubmit}>
                <input value="Losuj" type="submit" />
            </form>

            <form onSubmit={showPrevious}>
                <input value="Poprzedni" type="submit" />
            </form>

            <p className="quote">{quotes.loading ? "" : quotes.random.quote}</p>
        </div>
     );
}
 
export default Button;