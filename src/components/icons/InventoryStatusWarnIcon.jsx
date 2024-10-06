const InventoryStatusWarnIcon = ({
    width = '20px',
    height = '20px',
    fill = '#FFF'
}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={ width } height={ height } fill={ fill }>
            <path d="M264-109q-29.7 0-50.85-21.15Q192-151.3 192-181v-624q0-29.7 21.15-50.85Q234.3-877 264-877h312l192 192v288h-72v-240H528v-168H264v624h336v72H264Zm586 13L744-202v81h-72v-204h204v72h-82l106 106-50 51Zm-586-85v-624 624Z"/>
        </svg>
    );
}
 
export default InventoryStatusWarnIcon;