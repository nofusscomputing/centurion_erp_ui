const TicketRequest = ({
    width = '20px',
    height = '20px',
    fill = '#FFF'
}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={ width } height={ height } fill={ fill }>
            <path d="M446.67-400h66.66v-126.67H640v-66.66H513.33V-720h-66.66v126.67H320v66.66h126.67V-400ZM80-80v-733.33q0-27 19.83-46.84Q119.67-880 146.67-880h666.66q27 0 46.84 19.83Q880-840.33 880-813.33v506.66q0 27-19.83 46.84Q840.33-240 813.33-240H240L80-80Zm131.33-226.67h602v-506.66H146.67v575l64.66-68.34Zm-64.66 0v-506.66 506.66Z"/>
        </svg>
    );
}

export default TicketRequest