import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import {v} from '../../../styles/variables';
import {useThemeStore,} from '../../../index';

export function CardOffer({title,subtitle,sale}) {

  const Icon= sale? v.iconoMonedas:v.iconoBillete;
  const { theme } = useThemeStore();
  return (
    <StyledCard customtheme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mr: 2 }}>
          <TitleTypography variant="h5" >{title}</TitleTypography>
          <SubtitleTypography variant="body2" sx={{ position: "absolute", bottom: 80, left: 50 }} >{subtitle}</SubtitleTypography>
        <CardMedia
        sx={{ fontSize:60,position: "absolute", bottom: 10, right: 10,zIndex:1}}
        component= {Icon}
      />
      </Box>
      <StyledDiv />
    </StyledCard>
  );
};

const StyledCard = styled(Card)(({theme, customtheme}) => ({
  position: "relative",
  borderRadius: 16,
  padding: 12,
  backgroundColor:customtheme === "light" ? "#e5fcfb" : "#373a3aff",
  width:200,
  height:170,
  boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
  },
}));


const StyledDiv = styled("div")(() => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  transform: "translate(70%, 50%)",
  borderRadius: "50%",
  backgroundColor: "rgba(71, 167, 162, 0.12)",
  padding: "40%",

  "&:before": {
    position: "absolute",
    borderRadius: "50%",
    content: '""',
    display: "block",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "-16%",
    backgroundColor: "rgba(71, 167, 162, 0.08)",
  },
}));

const TitleTypography = styled(Typography)(() => ({
      color: "#fb703c",
      fontSize: "1.125rem",
      fontWeight: 700,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
      marginBottom: 0,
}));

const SubtitleTypography = styled(Typography)(() => ({
      color: "#48bbb5",
      fontSize: "1.75rem",
      fontWeight: 500,
}));