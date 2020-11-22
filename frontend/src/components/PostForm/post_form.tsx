import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

import "./post_form.scss";
import { MyQuery } from "../../data_types";
import { useLazyQuery } from "@apollo/client";
import { FIND_POST } from "../../queries/find_post_query";

// Just save yourself the headache and use mobx for this form
class FormData {
  values = {
    title: {
      value: "",
      component: "input",
    },
    body: {
      value: "",
      component: "textarea",
    },
    comment: {
      value: "",
      component: "input",
    },
    code: {
      value: "",
      component: "input",
    },
    category: {
      value: "",
      component: "input",
    },
  };
  get initialValues() {
    const { values } = this;
    type InitKeys = keyof typeof values;
    //@ts-ignore
    const initVal: Record<InitKeys, string> = {};
    for (const [k, v] of Object.entries(this.values)) {
      //@ts-ignore
      initVal[k] = v.value;
    }
    return initVal;
  }
  setPost(post: MyQuery.Post) {
    for (const [k, v] of Object.entries(post)) {
      //@ts-ignore
      this.values[k] = {
        value: v,
        component: k === "body" ? "textarea" : "input",
      };
    }
  }
}
type Params = {
  id?: string;
};
export default function PostForm() {
  const formData = new FormData();
  const { id } = useParams<Params>();
  const [initialValues, setInitVal] = useState(formData.initialValues);

  const [loadPost, { data }] = useLazyQuery<MyQuery.Post>(FIND_POST, {
    variables: { id },
  });

  useEffect(() => {
    if (id) loadPost();
  }, [id]);

  useEffect(() => {
    if (data) {
      formData.setPost(data);
      setInitVal(formData.initialValues);
    }
  }, [data]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(v) => {
        console.log(v);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {Object.entries(formData.values).map(([k, v], i) => {
            return (
              <div className="my-field" key={i}>
                <ErrorMessage
                  name={k}
                  component="div"
                  className={`${k}-error`}
                />
                <Field
                  type={k}
                  name={k}
                  component={v.component}
                  className={`${k} field`}
                  placeholder={k}
                />
              </div>
            );
          })}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
