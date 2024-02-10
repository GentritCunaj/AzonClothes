import React, { useEffect, useRef } from "react";

function useDragger(id) {
  const isClicked = useRef(false);
  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    const corner = document.getElementById("corner");
    if (!target) return;
    if (!corner) return;
    const container = target.parentElement;

    const onMouseDown = (e) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      // Remove event listeners for dragging to prevent duplicates
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };

    const onMouseUp = () => {
      if (isClicked.current) {
        isClicked.current = false;
        coords.current.lastX = target.offsetLeft;
        coords.current.lastY = target.offsetTop;
      }
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
      corner.style.top = `${nextY + target.offsetHeight}px`;
      corner.style.left = `${nextX + target.offsetWidth}px`;

     
    };

    const onMouseLeave = () => {
      if (isClicked.current) {
        // Remove event listeners for dragging when mouse leaves the container
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mouseleave", onMouseLeave);
      }
    };

    const onCornerMouseDown = (event) => {
      let w = target.clientWidth;
      let h = target.clientHeight;
      let startX = event.pageX;
      let startY = event.pageY;

      const drag = (event) => {
        event.preventDefault();
        target.style.width = w + (event.pageX - startX) + "px";
        target.style.height = h + (event.pageY - startY) + "px";
      };

      const onCornerMouseUp = () => {
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", onCornerMouseUp);
        // Reattach event listeners for dragging when resizing is done
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseleave", onMouseLeave);
      };

      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", onCornerMouseUp);
    };

    target.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    corner.addEventListener("mousedown", onCornerMouseDown);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      corner.removeEventListener("mousedown", onCornerMouseDown);
    };

    return cleanup;
  }, [id]);

}

export default useDragger;
