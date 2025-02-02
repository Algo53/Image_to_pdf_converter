'use client';

import { useState, useCallback } from 'react';
import jsPDF from 'jspdf';
import { useDropzone } from 'react-dropzone';
import { FiX, FiArrowUp, FiArrowDown, FiDownload, FiEye, FiImage } from 'react-icons/fi';

interface ImageFile {
  id: string;
  url: string;
  file: File;
}

const ImageToPdfConverter = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
    }));
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: true,
  });

  const moveImageUp = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const newImages = [...prev];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      return newImages;
    });
  };

  const moveImageDown = (index: number) => {
    if (index === images.length - 1) return;
    setImages((prev) => {
      const newImages = [...prev];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      return newImages;
    });
  };


  const generatePdf = async (preview = false) => {
    const doc = new jsPDF();

    for (const [index, image] of images.entries()) {
      if (index > 0) doc.addPage();
      const imgData = await loadImage(image.url);
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }

    if (preview) {
      const pdfBlob = doc.output('blob');
      setPdfPreview(URL.createObjectURL(pdfBlob));
    } else {
      doc.save('converted.pdf');
    }
  };

  const loadImage = (url: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
    });
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="flex w-full items-center justify-center h-max bg-gray-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl">
      <div className="flex flex-col w-full mx-auto items-center justify-center gap-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Image to PDF Converter</h1>

        <div
          {...getRootProps()}
          className={`mb-6 p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
        >
          <input {...getInputProps()} />
          <FiImage className="mx-auto text-3xl text-gray-400 mb-2" />
          <p className="text-gray-600">
            {isDragActive ? 'Drop images here' : 'Drag & drop images, or click to select'}
          </p>
          <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG</p>
        </div>

        {images.length > 0 && (
          <div className='flex flex-col gap-5 w-max h-full p-4 border-[1px] border-black rounded-xl'>
            <div className='flex flex-col w-full max-h-64 overflow-y-scroll gap-4 pb-4 hide-scrollbar'>
              {
                images.map((image, index) => (
                  <div key={image.id} className="flex items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl border">
                    <FiImage className="text-gray-400 mr-4" />
                    <span className="flex-1 lg:w-40 w-min truncate">{image.file.name}</span>

                    {/* Move Up Button */}
                    <button
                      onClick={() => moveImageUp(index)}
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50"
                      disabled={index === 0}
                    >
                      <FiArrowUp />
                    </button>

                    {/* Move Down Button */}
                    <button
                      onClick={() => moveImageDown(index)}
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50"
                      disabled={index === images.length - 1}
                    >
                      <FiArrowDown />
                    </button>

                    {/* Remove Image */}
                    <button
                      onClick={() => removeImage(image.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex justify-end space-x-4 mb-6">
              <button
                onClick={() => generatePdf(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
              >
                <FiEye className="mr-2" /> Preview PDF
              </button>
              <button
                onClick={() => generatePdf()}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
              >
                <FiDownload className="mr-2" /> Download PDF
              </button>
            </div>
          </div>
        )}

        {
          images.length > 0 && pdfPreview && (
            <div className="flex flex-col gap-5 items-center justify-center h-max w-full">
              <div className='flex w-full h-full justify-between px-5'>
                <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-black/50 to-black/80 text-white rounded-md py-2 px-3 shadow-xl">PDF Preview</h2>
                <button
                  className='flex h-max rounded-md text-white py-1 px-3 bg-gradient-to-r from-red-600 to-red-900 hover:from-red-300 hover:to-red-600 shadow-xl hover:shadow-2xl'
                  onClick={() => setPdfPreview(null)}
                >
                  Cancel
                </button>
              </div>
              <iframe
                src={pdfPreview}
                className="w-full min-h-dvh border rounded-lg shadow-sm"
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ImageToPdfConverter;