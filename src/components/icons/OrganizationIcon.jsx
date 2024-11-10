const OrganizationIcon = ({
    width = '20px',
    height = '20px',
    fill = '#FFF'
}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={ width } height={ height } fill={ fill }>
            <path d="M96-144v-648h384v144h384v504H96Zm72-72h240v-72H168v72Zm0-144h240v-72H168v72Zm0-144h240v-72H168v72Zm0-144h240v-72H168v72Zm312 432h312v-360H480v360Zm72-216v-72h168v72H552Zm0 144v-72h168v72H552Z"/>
        </svg>
    );
}
 
export default OrganizationIcon;
