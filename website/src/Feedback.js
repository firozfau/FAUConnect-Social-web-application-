import { useNavigate } from "react-router-dom";
import styles from "./Feedback.module.css";

const Feedback = () => {
  const navigate = useNavigate();

  const onGroupContainer1Click = useCallback(() => {
    navigate("/idle-chat");
  }, [navigate]);

  return (
    <div className={styles.feedback}>
      <div className={styles.questionair}>
        <div className={styles.questionairChild} />
        <div className={styles.fieldsOfStudy}>
          <div className={styles.fieldsOfStudy1}>Did you meet?</div>
          <div className={styles.rectangleParent}>
            <div className={styles.groupChild} />
            <div className={styles.yes}>Yes</div>
          </div>
          <div className={styles.rectangleGroup}>
            <div className={styles.groupItem} />
            <div className={styles.no}>No</div>
          </div>
          <div className={styles.rectangleContainer}>
            <div className={styles.groupChild} />
            <div className={styles.yes}>Yes</div>
          </div>
          <div className={styles.groupDiv}>
            <div className={styles.groupItem} />
            <div className={styles.no}>No</div>
          </div>
        </div>
        <img className={styles.person1Icon} alt="" src="/person-1@2x.png" />
        <div className={styles.howDidYou}>
          How did you like the match with Rebecca?
        </div>
        <div className={styles.doYouWantToArchiveTheChaWrapper}>
          <div className={styles.doYouWant}>
            Do you want to archive the chat and continue chatting?
          </div>
        </div>
        <div
          className={styles.rectangleParent1}
          onClick={onGroupContainer1Click}
        >
          <div className={styles.groupChild1} />
          <div className={styles.closeReview}>Close review</div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
