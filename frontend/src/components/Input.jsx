import { FileInput, Label } from "flowbite-react";

export function Input({
  isUploaded,
  handleFileChange,
  isCompleted,
  isLoading,
}) {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <Label
        htmlFor="dropzone-file"
        className="group flex h-64 w-96 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-300 bg-white shadow-lg transition-all hover:border-orange-400 hover:bg-orange-50 hover:shadow-xl dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="flex flex-col items-center justify-center p-4 transition-all duration-300 ease-in-out">
          {isUploaded ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="none"
                viewBox="0 0 128 128"
                id="check-task"
                className="mb-4 text-green-500"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="6"
                  d="M77.5 35H85C89.4183 35 93 38.5817 93 43V94C93 98.4183 89.4183 102 85 102H43C38.5817 102 35 98.4183 35 94V43C35 38.5817 38.5817 35 43 35H50.5"
                ></path>
                <path
                  stroke="currentColor"
                  strokeWidth="6"
                  d="M51.4772 30.4286C51.2224 28.0635 53.0754 26 55.4542 26H71.5458C73.9246 26 75.7776 28.0635 75.5228 30.4286L74.6607 38.4286C74.4418 40.4601 72.727 42 70.6837 42H56.3163C54.273 42 52.5582 40.4601 52.3393 38.4286L51.4772 30.4286Z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="6"
                  d="M52 69.9582C54.6047 72.4561 59.9256 77.5588 60.3721 77.987C60.8186 78.4152 70.9767 68.1741 76 63"
                ></path>
              </svg>
              <p className="text-base font-medium text-green-700 dark:text-green-300">
                File Uploaded!
              </p>
            </>
          ) : isCompleted ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 48 48"
                className="mb-2"
              >
                <linearGradient
                  id="completeGradient"
                  x1="9.858"
                  x2="38.142"
                  y1="9.858"
                  y2="38.142"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#9dffce" />
                  <stop offset="1" stopColor="#50d18d" />
                </linearGradient>
                <circle fill="url(#completeGradient)" cx="24" cy="24" r="20" />
                <path
                  fill="#11522f"
                  d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"
                />
              </svg>
              <p className="text-base font-semibold text-green-600 dark:text-green-300">
                Done!
              </p>
            </>
          ) : isLoading ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                id="loading"
                className="h-10 w-10 animate-spin text-orange-500"
              >
                <path
                  fill="currentColor"
                  d="M29.89 15.81a2.51 2.51 0 1 0-5 .45 9.65 9.65 0 0 1-1.68 6.34 10.24 10.24 0 0 1-5.74 4 10.71 10.71 0 0 1-7.38-.7 11.44 11.44 0 0 1-5.48-5.62A12.07 12.07 0 0 0 9.46 27 12.58 12.58 0 0 0 17.9 29a13.31 13.31 0 0 0 8.18-4 14 14 0 0 0 3.81-8.75v-.08A2.29 2.29 0 0 0 29.89 15.81z"
                />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="animate-pulse">Working on it…</span>
              </p>
            </>
          ) : (
            <>
              <svg
                className="mb-3 h-10 w-10 text-gray-400 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">Click to upload</span> or drag and
                drop your file
              </p>
            </>
          )}
        </div>
        <FileInput
          id="dropzone-file"
          className="hidden"
          onChange={handleFileChange}
        />
      </Label>
    </div>
  );
}
