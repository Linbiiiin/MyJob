import {useRef} from 'react';

const useLatest = (ref) => {
  const targetRef = useRef(ref);

  targetRef.current = ref;

  return targetRef;
};

export default useLatest;
