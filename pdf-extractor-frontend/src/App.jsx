import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Download, Loader2 } from "lucide-react";

export default function PDFTableExtractorUI() {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setDownloadLink(null);
    setError(null);
  };

  const handleExtractTables = async () => {
    if (!file) {
      setError("Please upload a PDF file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      const response = await axios.post("http://localhost:5000/extract", formData);
      setDownloadLink(response.data.downloadLink);
    } catch (error) {
      console.error("Extraction failed", error);
      setError("Failed to extract tables. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-700 bg-opacity-90">
    <Card className="w-[500px] p-8 shadow-2xl rounded-xl bg-white/90 backdrop-blur-md">
      <CardContent className="flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FileText size={28} /> PDF Table Extractor
        </h2>
        <Input type="file" accept="application/pdf" onChange={handleFileChange} className="border p-3 rounded w-full" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleExtractTables} disabled={loading} className="w-full flex items-center gap-2 bg-black text-white py-3 text-lg hover:bg-gray-800">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
          {loading ? "Extracting..." : "Extract Tables"}
        </Button>
        {downloadLink && (
          <a
            href={`http://localhost:5000${downloadLink}`}
            download
            className="mt-4 block text-blue-800 underline flex items-center gap-2 text-lg hover:text-blue-900"
          >
            <Download size={18} /> Download Extracted Tables
          </a>
        )}
      </CardContent>
    </Card>
  </div>
  );
}
