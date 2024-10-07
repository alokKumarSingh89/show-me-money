export interface IHeaderProp {
  title: string;
}
export const Header = ({ title }: IHeaderProp) => {
  return (
    <div className="bg-blue-500 text-white font-bold text-xl py-5 pl-5 shadow-md">
      <h1>{title}</h1>
    </div>
  );
};
