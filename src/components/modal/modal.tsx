import {FC} from "react";
import {useAppSelector} from "../../common/hooks";
import s from './modal.module.scss'
import {Preloader} from "../preloader";

type ModalProps = {
    onClose: () => void
}
export const Modal: FC<ModalProps> = ({onClose}) => {

    const status = useAppSelector((state) => state.app.status);
    const userInfo = useAppSelector((state) => state.users.userInfo);

    return (
        <div className={s.root}>
            <div className={s.modal}>
                <button onClick={onClose} className={s.btn}>Х</button>
                {
                    status === "loading" ?
                        <Preloader/> :
                        <>

                            <div className={s.imgContainer}>
                                <img src={userInfo.avatar_url} alt=""/>
                            </div>
                            <h1>{userInfo.name}</h1>
                            <p>Repositories count: {userInfo.public_repos}</p>
                            <p>Followers count: {userInfo.followers}</p>
                        </>
                }

            </div>
        </div>
    );
}

