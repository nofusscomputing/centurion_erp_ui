const Card = ({
    heading,
    body
}) => {
    return (
        <section
            className="card"
        >
            <h3>{heading}</h3>
            {body}
        </section>
    );
}
 
export default Card;
