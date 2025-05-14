interface CircularIconsProps {
  spacing?: number;
}

const CircularIcons: React.FC<CircularIconsProps> = ({
  spacing = 100,
}) => {
  const icons = [
    { icon: 'fas fa-computer text-emerald-400 text-6xl', name: 'computer' },
    { icon: 'fa-brands fa-square-js text-yellow-400 text-6xl', name: 'js' },
    { icon: 'fas fa-server text-orange-400 text-6xl', name: 'server' },
    { icon: 'fa-brands fa-react text-cyan-400 text-6xl', name: 'react' },
    { icon: 'fas fa-power-off text-green-400 text-6xl', name: 'power-off' },
    { icon: 'fas fa-cloud-bolt text-red-400 text-6xl', name: 'cloud-bolt' },
  ];

  return (
    <div className="relative w-[300px] h-[300px] mx-auto">
      {/* Container for the circular arrangement */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/* Icon container with rotation */}
        <div className="w-full h-full">
          {icons.map((iconObj, index) => {
            const angle = (index * 360) / icons.length;
            
            return (
              <div
                key={iconObj.name}
                className="absolute top-1/2 right-1/2 w-10 h-10 flex justify-center items-center"
                style={{
                  transform: `
                    rotate(${angle}deg)
                    translate(${spacing}px)
                    rotate(-${angle}deg)
                  `,
                }}
              >
                <i
                  className={iconObj.icon}
                ></i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CircularIcons;