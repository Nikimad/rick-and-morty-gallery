import { MaleIcon, FemaleIcon, GenderlessIcon } from '../icons';

const iconsMap = {
  Male: MaleIcon,
  Female: FemaleIcon,
  Genderless: GenderlessIcon
};

export const Gender = ({ gender }) => {
  const Icon = iconsMap[gender] || GenderlessIcon;

  return <Icon />;
};
