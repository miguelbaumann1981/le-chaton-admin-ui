export const Footer = () => {
  return (
    <footer className='footer sm:footer-horizontal footer-center bg-primary-content text-base-content p-4 sticky bottom-0 left-0 right-0  border-t-2 border-gray-500'>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};
