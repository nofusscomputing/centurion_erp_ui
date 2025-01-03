const InventoryStatusBadIcon = ({
    width = '20px',
    height = '20px',
    fill = '#FFF'
}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={ width } height={ height } fill={ fill }>
            <path d="M264-792v168-168 624-8.5 8.5-624Zm0 696q-29.7 0-50.85-21.15Q192-138.3 192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v198q-18-4-36-5t-36 1v-146H528v-168H264v624h228q6.25 20.08 15.63 37.54Q517-113 529-96H264Zm387-24-51-51 69-69-69-69 51-51 69 69 69-69 51 51-69 69 69 69-51 51-69-69-69 69Z"/>
        </svg>
    );
}
 
export default InventoryStatusBadIcon;