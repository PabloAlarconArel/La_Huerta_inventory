import Box from "@mui/material/Box";
import {Card , CardContent} from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import {useThemeStore,} from '../../../index';

export function GraphicCard({title,children,subtitle}) {

  const { theme } = useThemeStore();
  return (
    <StyledCard customtheme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3, mr: 1 }}>
          <TitleTypography variant="h5" >{title}</TitleTypography>
          <SubtitleTypography variant="body2" >{subtitle}</SubtitleTypography>
          <CardContent>
                {children}
          </CardContent>
      </Box>
      
    </StyledCard>
  );
};

const StyledCard = styled(Card)(({theme, customtheme}) => ({
  position: "relative",
  borderRadius: 16,
  padding: 12,
  backgroundColor:customtheme === "light" ? "#e5fcfb" : "#373a3aff",
  width:420,
  height:"auto",
  boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
  },
}));


const TitleTypography = styled(Typography)(() => ({
      color: "#fb703c",
      fontSize: "1.125rem",
      fontWeight: 700,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
}));

const SubtitleTypography = styled(Typography)(() => ({
      color: "#48bbb5",
      fontSize: "1.2rem",
      fontWeight: 600,
}));