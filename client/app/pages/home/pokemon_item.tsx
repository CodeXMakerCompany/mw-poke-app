import SlideFromRightWrapper from "@/app/components/unique/animations/right-to-left";
import { Pokemon } from "@/app/models/pokemon";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import Image from "next/image";

interface PokemonItemProps extends Pokemon {
  id: number;
}

const speed_rate = 0.2;

const PokemonItem = ({ id, name, image, types }: PokemonItemProps) => {
  return (
    <SlideFromRightWrapper delay={id * speed_rate}>

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          minHeight: 200,
          overflow: 'hidden',
        }}
      >

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Image
            data-testid={`test-poke-img-${id}`}
            alt={name}
            width={140}
            height={140}
            src={image}
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Box>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          transition: 'transform 0.2s, border-color 0.2s',
          '&:hover': {
            transform: 'translateY(-8px)',
            borderColor: '#3a3a3a',
          }
        }}
      >



        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              textTransform: 'capitalize',
              mb: 2,
              color: '#ffffff'
            }}
          >
            {name}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            {types.map((type) => (
              <Chip
                key={type}
                label={type}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 500,
                  bgcolor: '#2a2a2a',
                  color: '#b0b0b0',
                  border: '1px solid #3a3a3a',
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </SlideFromRightWrapper>
  );
};

export default PokemonItem;
