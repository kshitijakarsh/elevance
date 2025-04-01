import { Request, Response, NextFunction } from "express";
import { PdfReader } from "pdfreader";

export const extractPDFText = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  let text = "";
  const file = req.file;

  try {
    await new Promise<void>((resolve, reject) => {
      new PdfReader().parseBuffer(file.buffer, (err, item) => {
        if (err) {
          res.status(500).json({ error: "Failed to process PDF" });
          reject(err);
          return; 
        }

        if (!item) {
          (req as any).extractedText = text;
          resolve();
          return;
        }

        if (item.text) {
          text += item.text;
        }
      });
    });

    next();

  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};
