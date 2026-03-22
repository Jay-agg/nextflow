import type { NodeTypes } from "@xyflow/react";
import TextNode from "./TextNode";
import UploadImageNode from "./UploadImageNode";
import UploadVideoNode from "./UploadVideoNode";
import CropImageNode from "./CropImageNode";
import ExtractFrameNode from "./ExtractFrameNode";
import LLMNode from "./LLMNode";

export const nodeTypes: NodeTypes = {
  text: TextNode,
  uploadImage: UploadImageNode,
  uploadVideo: UploadVideoNode,
  cropImage: CropImageNode,
  extractFrame: ExtractFrameNode,
  llm: LLMNode,
};
