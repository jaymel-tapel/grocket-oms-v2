import React from "react";
import { editProspectEmailTemplateRoute } from "../../routeTree";
import EmailTemplateForm from "../../../components/prospects/EmailTemplateForm";

const template = {
  id: 1,
  name: "Template 1",
  subject: "Test Email Template",
  content:
    "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt praesent semper feugiat nibh sed. At augue eget arcu dictum varius duis. Imperdiet massa tincidunt nunc pulvinar sapien. Aliquam purus sit amet luctus. Vel facilisis volutpat est velit egestas dui. Sed arcu non odio euismod lacinia at quis. Consequat nisl vel pretium lectus quam id leo in. Diam phasellus vestibulum lorem sed. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Magna etiam tempor orci eu lobortis elementum nibh. Tempor orci eu lobortis elementum nibh. In hac habitasse platea dictumst quisque sagittis. Sollicitudin ac orci phasellus egestas tellus rutrum. Dignissim diam quis enim lobortis. Magna sit amet purus gravida quis blandit turpis cursus. Amet consectetur adipiscing elit pellentesque habitant morbi tristique. Habitant morbi tristique senectus et.<br/><br/>Vitae auctor eu augue ut lectus. Porta nibh venenatis cras sed felis eget velit. Nunc sed velit dignissim sodales ut. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Volutpat est velit egestas dui id ornare arcu odio ut. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Nisi lacus sed viverra tellus in. Nisi scelerisque eu ultrices vitae. Risus ultricies tristique nulla aliquet. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Eu mi bibendum neque egestas congue quisque. In vitae turpis massa sed elementum tempus egestas. Mi bibendum neque egestas congue. In vitae turpis massa sed elementum tempus egestas. Lectus quam id leo in. Purus in mollis nunc sed id. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.</p>",
};

const EmailTemplate = () => {
  const { templateId } = editProspectEmailTemplateRoute.useParams();

  return (
    <>
      <div className="mt-4">
        <span className="flex gap-2">
          <p>Prospects / Email Templates / </p>
          <p className="text-[#41B2E9]">
            {templateId ? templateId : "New Template"}
          </p>
        </span>
      </div>
      <div className="mt-8">
        <EmailTemplateForm template={templateId ? template : undefined} />
      </div>
    </>
  );
};

export default EmailTemplate;
