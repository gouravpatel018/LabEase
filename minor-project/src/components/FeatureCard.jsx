import React from "react";

function FeatureCard({
  imgSrc = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  title = "Card Title",
  description = "A card component has a figure, a body part, and inside body there are title and actions parts",
}) {
  return (
    <div>
      <div className="card bg-base-200 border border-black/10 w-96 shadow-sm">
        <figure>
          <img
            src={imgSrc}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{title}</h2>
          <p>
            {description}
          </p>
          <div className="card-actions justify-start">
            <p className="text-blue-900 underline cursor-pointer">Explore now &#8594;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
