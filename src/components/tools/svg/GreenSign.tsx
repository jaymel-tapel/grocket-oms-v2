export const GreenSign = () => {
  return (
    <span
      style={{ maxWidth: "fit-content" }}
      className="flex items-center gap-1 rounded-md bg-[#10B981] p-1 text-xs font-medium text-white"
    >
      <svg
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.0155 5.24683H9.49366C9.23116 5.24683 9.01241 5.46558 9.01241 5.72808C9.01241 5.99058 9.23116 6.20933 9.49366 6.20933H11.6593L8.85928 8.09058C8.74991 8.17808 8.59678 8.17808 8.46553 8.09058L5.57803 6.18745C5.11866 5.8812 4.54991 5.8812 4.09053 6.18745L0.721783 8.44058C0.503033 8.5937 0.437408 8.89995 0.590533 9.1187C0.678033 9.24995 0.831157 9.33745 1.00616 9.33745C1.09366 9.33745 1.20303 9.31558 1.26866 9.24995L4.65928 6.99683C4.76866 6.90933 4.92178 6.90933 5.05303 6.99683L7.94053 8.92183C8.39991 9.22808 8.96866 9.22808 9.42803 8.92183L12.5124 6.8437V9.27183C12.5124 9.53433 12.7312 9.75308 12.9937 9.75308C13.2562 9.75308 13.4749 9.53433 13.4749 9.27183V5.72808C13.5187 5.46558 13.278 5.24683 13.0155 5.24683Z"
          fill="white"
        ></path>
      </svg>
      <span className="text-white">+2.5%</span>
    </span>
  );
};

export const RedSign = () => {
  return (
    <span
      style={{ maxWidth: "fit-content" }}
      className="flex items-center gap-1 rounded-md bg-[#FB5454] p-1 text-xs font-medium text-white"
    >
      <svg
        width="14"
        height="5"
        viewBox="0 0 14 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.6592 0.246887C12.3967 0.246887 12.1779 0.465637 12.1779 0.728137V3.15626L9.0498 1.07814C8.59042 0.771887 8.02167 0.771887 7.5623 1.07814L4.6748 3.00314C4.56542 3.09064 4.4123 3.09064 4.28105 3.00314L0.890423 0.750012C0.671673 0.596887 0.365423 0.662512 0.212298 0.881262C0.0591726 1.10001 0.124798 1.40626 0.343548 1.55939L3.73417 3.81251C4.19355 4.11876 4.7623 4.11876 5.22167 3.81251L8.10917 1.88751C8.21855 1.80001 8.37167 1.80001 8.50292 1.88751L11.3029 3.76876H9.1373C8.8748 3.76876 8.65605 3.98751 8.65605 4.25001C8.65605 4.51251 8.8748 4.73126 9.1373 4.73126H12.6592C12.9217 4.73126 13.1404 4.51251 13.1404 4.25001V0.728137C13.1623 0.465637 12.9217 0.246887 12.6592 0.246887Z"
          fill="white"
        />
      </svg>

      <span className="text-white">+1.5%</span>
    </span>
  );
};
