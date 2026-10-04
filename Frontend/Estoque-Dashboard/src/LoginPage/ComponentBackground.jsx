import { Lottie } from "lottie-react";
import animationData from "../assets/AnimationData.json";

export default function ComponentBackground() {
  return (
    <div className="w-full h-full bg-slate-800">
      <Lottie
        animationData={animationData}
        loop
        autoplay
      />
    </div>
  );
}