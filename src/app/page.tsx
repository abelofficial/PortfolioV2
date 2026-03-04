import { redirect } from 'next/navigation';

const DefaultHome = () => {
  redirect('/en/about');
};

export default DefaultHome;
