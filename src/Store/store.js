import {
    configureStore
} from "@reduxjs/toolkit"
import { attendence_api } from "../Api/Attendence_api/Attendence_api";
import { assessment_api } from "../Api/Assessment_api/Assessment_api";
import { linkedin_post_api } from "../Api/Linkedin_Post_api/Linkedin_Post_api";
import { project_review_api } from "../Api/Project_Review_api/Project_Review_api";
import { project_submission_api } from "../Api/Project_Submission_api/Project_Submission_api";
import { userReducer } from "../Reducers/userReducer/userReducer";
import { auth_api } from "../Api/Auth_api/Auth_api";

const store = configureStore({
    reducer: {
        [attendence_api.reducerPath]:attendence_api.reducer,
        [assessment_api.reducerPath]:assessment_api.reducer,
        [linkedin_post_api.reducerPath]:linkedin_post_api.reducer,
        [project_review_api.reducerPath]:project_review_api.reducer,
        [project_submission_api.reducerPath]:project_submission_api.reducer,
        [auth_api.reducerPath]:auth_api.reducer,
        [userReducer.name]:userReducer.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        attendence_api.middleware,
        assessment_api.middleware,
        linkedin_post_api.middleware,
        project_review_api.middleware,
        project_submission_api.middleware,
        auth_api.middleware,
    ]
});

export default store;