const ITIMIcon = ({
    width = '20px',
    height = '20px',
    fill = '#FFF'
}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={ width } height={ height } fill={ fill }>
            <path d="M2 4.6V9.4C2 10.3 2.5 11 3.2 11H20.9C21.5 11 22.1 10.3 22.1 9.4V4.6C22 3.7 21.5 3 20.8 3H3.2C2.5 3 2 3.7 2 4.6M10 8V6H9V8H10M5 8H7V6H5V8M20 9H4V5H20V9M2 14.6V19.4C2 20.3 2.5 21 3.2 21H20.9C21.5 21 22.1 20.3 22.1 19.4V14.6C22.1 13.7 21.6 13 20.9 13H3.2C2.5 13 2 13.7 2 14.6M10 18V16H9V18H10M5 18H7V16H5V18M20 19H4V15H20V19Z" />
        </svg>
    );
}

export default ITIMIcon