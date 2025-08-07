import styled from "styled-components";
import PropTypes from "prop-types";

export function AccionTabla({ funcion, icono, color, fontSize }) {
  return <Container onClick={funcion} color={color} fontSize={fontSize}>{icono}</Container>;
}
const Container = styled.span`
color:${(props)=>props.color};
font-size:${(props)=>props.fontSize};
cursor: pointer;

`;

AccionTabla.PropTypes = {
    funcion: PropTypes.func.isRequired,
    icono: PropTypes.element.isRequired,
    color: PropTypes.string,
    fontSize: PropTypes.string,
};