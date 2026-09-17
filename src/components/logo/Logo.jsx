import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link
            to="/"
            className="
              group
              flex
              items-center
              gap-2
              px-2
              text-xl
              font-extrabold
              tracking-tight
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-primary
                text-sm
                font-black
                text-primary-content
                shadow-md
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:shadow-primary/30
              "
            >
              PC
            </span>

            <span className="text-white">
              PC<span className="text-primary">Builder</span>
            </span>
          </Link>
        </div>
    );
};

export default Logo;