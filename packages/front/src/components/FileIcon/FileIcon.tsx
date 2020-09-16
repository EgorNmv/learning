import React from "react";
import "./file-icon.css";
import FileSvg from "../../static/ico/file.svg";
import AviSvg from "../../static/ico/avi.svg";
import CssSvg from "../../static/ico/css.svg";
import CsvSvg from "../../static/ico/csv.svg";
import DocSvg from "../../static/ico/doc.svg";
import ExeSvg from "../../static/ico/exe.svg";
import HtmlSvg from "../../static/ico/html.svg";
import IsoSvg from "../../static/ico/iso.svg";
import JsSvg from "../../static/ico/javascript.svg";
import JpgSvg from "../../static/ico/jpg.svg";
import JsonSvg from "../../static/ico/json-file.svg";
import Mp3Svg from "../../static/ico/mp3.svg";
import Mp4Svg from "../../static/ico/mp4.svg";
import PdfSvg from "../../static/ico/pdf.svg";
import PngSvg from "../../static/ico/png.svg";
import SvgSvg from "../../static/ico/svg.svg";
import TxtSvg from "../../static/ico/txt.svg";
import XlsSvg from "../../static/ico/xls.svg";
import XmlSvg from "../../static/ico/xml.svg";
import ZipSvg from "../../static/ico/zip.svg";

type FileIconProps = {
  filename: string | null;
};

export const FileIcon: React.FC<FileIconProps> = ({ filename }) => {
  if (filename) {
    const extensionsWithIconsMap: { [extension: string]: string } = {
      avi: AviSvg,
      css: CssSvg,
      csv: CsvSvg,
      doc: DocSvg,
      docx: DocSvg,
      exe: ExeSvg,
      html: HtmlSvg,
      iso: IsoSvg,
      js: JsSvg,
      jpg: JpgSvg,
      jpeg: JpgSvg,
      json: JsonSvg,
      mp3: Mp3Svg,
      mp4: Mp4Svg,
      pdf: PdfSvg,
      png: PngSvg,
      svg: SvgSvg,
      txt: TxtSvg,
      xls: XlsSvg,
      xml: XmlSvg,
      zip: ZipSvg,
      default: FileSvg,
    };
    const fileExtension: string | undefined = filename.split(".").pop();

    return (
      <img
        className="material-file-icon"
        src={
          fileExtension && extensionsWithIconsMap[fileExtension]
            ? extensionsWithIconsMap[fileExtension]
            : extensionsWithIconsMap["default"]
        }
        alt="Иконка файла"
      />
    );
  } else {
    return null;
  }
};
