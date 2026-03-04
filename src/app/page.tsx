import { redirect } from 'next/navigation';

const DefaultHome = () => {
  redirect('/en');
};

export default DefaultHome;
