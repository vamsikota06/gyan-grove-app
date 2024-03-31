import styled from 'styled-components'

export const LiBgImage = styled.li`
    margin-right:20px;
    background-color:grey;
    background-image: url(${(props) => props.bgimage});
    background-size:cover;
    border-radius:10px;
    height:400px;
    display:flex;
    align-items: flex-end;
`