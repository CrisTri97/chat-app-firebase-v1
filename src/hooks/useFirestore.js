import { useEffect, useState } from "react";
import { db } from "../fireBase/config";

const useFirestore = (collection, condition) => {
  const [document, setDocument] = useState([]);

  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createAt");
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocument(documents);
    });

    return () => {
      unsubscribe();
    };
  }, [collection, condition]);
  return document;
};

export default useFirestore;
