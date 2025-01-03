const OperatingSystem = ({
    width = '20px',
    height = '20px',
    fill = '#FFF'
}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={ width } height={ height } fill={ fill }>
            <path d="M787.33-60 736-110.67l122.67-122.66-122-122L787.33-406l173.34 172.67L787.33-60Zm-460.66-60v-80h-180q-27 0-46.84-19.83Q80-239.67 80-266.67v-506.66q0-27 19.83-46.84Q119.67-840 146.67-840h666.66q27 0 46.84 19.83Q880-800.33 880-773.33V-482h-66.67v-291.33H146.67v506.66H684V-200h-64v80H326.67ZM446-366h66.67v-126.67h126.66v-66.66H512.67V-686H446v126.67H319.33v66.66H446V-366Zm-299.33 99.33v-506.66 506.66Z"/>
        </svg>
    );
}

export default OperatingSystem