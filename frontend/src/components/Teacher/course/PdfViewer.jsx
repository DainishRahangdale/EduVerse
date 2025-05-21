const PdfViewer = ({ src }) => {
    return (
      <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src={src}
          className="w-full h-full"
          frameBorder="0"
          title="PDF Viewer"
        />
      </div>
    );
  };
export default PdfViewer;  