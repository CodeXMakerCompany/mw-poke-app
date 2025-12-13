import SlideFromRightWrapper from "@/app/components/unique/animations/right-to-left";
import { Pokemon } from "@/app/models/pokemon";
import Image from "next/image";

interface PokemonItemProps extends Pokemon {
  id: number;
}

const speed_rate = 0.2;

const PokemonItem = ({ id, name, image }: PokemonItemProps) => {
  return (
    <SlideFromRightWrapper delay={id * speed_rate}>
      <p> {name.toLocaleUpperCase()} </p>
      <Image alt={`${name}`} width={100} height={100} src={image} />
    </SlideFromRightWrapper>
  );
};

export default PokemonItem;
