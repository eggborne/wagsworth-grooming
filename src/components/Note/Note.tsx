const Note = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <blockquote>
      <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>Note: </span>
      {children}
    </blockquote>
  );
}

export default Note;