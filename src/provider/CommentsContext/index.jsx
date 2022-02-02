import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../../services/api";
import { useAuth } from "../AuthContext";
import { usePhrases } from "../PhrasesContext";

const CommentsContext = createContext({});

const useComments = () => {
  const context = useContext(CommentsContext);

  if (!context) {
    throw new Error("useComments must be used within an CommentsProvider");
  }
  return context;
};

const CommentsProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const { phrases } = usePhrases([]);
  const [frase, setFrase] = useState({});
  const [comments, setComments] = useState([]);
  const [fraseComments, setFraseComments] = useState([]);

  const RandomPhrase = () => {
    const randomId = Math.floor(Math.random() * 97 + 1);
    const phrase = phrases.find((item) => item.id === randomId);
    if (phrase) {
      setFrase(phrase);
    }
  };

  const GetComments = useCallback(async () => {
    try {
      const response = await api.get(`comments?_expand=phrase&_expand=user`);
      setComments(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    GetComments();
    RandomPhrase();
    PhraseComments();
  }, [phrases]);

  const PhraseComments = (id) => {
    try {
      const comentario = comments.filter((item) => item.phraseId === id);
      console.log(comentario);
      setFraseComments(comentario);
    } catch (err) {
      console.log(err);
    }
  };

  const AddComment = useCallback(async (data) => {
    const id = data.phraseId;
    console.log(data.phraseId);
    try {
      const response = await api.post(`comments/`, data, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      PhraseComments(id);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <CommentsContext.Provider
      value={{
        frase,
        comments,
        fraseComments,
        GetComments,
        PhraseComments,
        AddComment,
        RandomPhrase,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export { useComments, CommentsProvider };
