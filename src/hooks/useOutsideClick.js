import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log("Click outside of the  component that is clicked");
          handler();
        }
      }
      //here click event is only used in capturing phase due to true
      //because in bubble phase it cause error. When we click on add new cabin modal window should be open but this Modal element is parent element of all element in dom(because of createPortal) so click event is trigreed and close the modal window
      document.addEventListener("click", handleClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
