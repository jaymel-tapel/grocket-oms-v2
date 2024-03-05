import LoggedSection from "../../components/sections/LoggedSection";
import EmailTemplateCard from "../../components/prospects/EmailTemplateCard";
import { Button } from "../../components/tools/buttons/Button";

const TEMPLATES = [
  {
    name: "Template 1",
    subject: "Test Email Template",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt praesent semper feugiat nibh sed. At augue eget arcu dictum varius duis. Imperdiet massa tincidunt nunc pulvinar sapien. Aliquam purus sit amet luctus. Vel facilisis volutpat est velit egestas dui. Sed arcu non odio euismod lacinia at quis. Consequat nisl vel pretium lectus quam id leo in. Diam phasellus vestibulum lorem sed. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Magna etiam tempor orci eu lobortis elementum nibh. Tempor orci eu lobortis elementum nibh. In hac habitasse platea dictumst quisque sagittis. Sollicitudin ac orci phasellus egestas tellus rutrum. Dignissim diam quis enim lobortis. Magna sit amet purus gravida quis blandit turpis cursus. Amet consectetur adipiscing elit pellentesque habitant morbi tristique. Habitant morbi tristique senectus et.<br/><br/>Vitae auctor eu augue ut lectus. Porta nibh venenatis cras sed felis eget velit. Nunc sed velit dignissim sodales ut. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Volutpat est velit egestas dui id ornare arcu odio ut. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Nisi lacus sed viverra tellus in. Nisi scelerisque eu ultrices vitae. Risus ultricies tristique nulla aliquet. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Eu mi bibendum neque egestas congue quisque. In vitae turpis massa sed elementum tempus egestas. Mi bibendum neque egestas congue. In vitae turpis massa sed elementum tempus egestas. Lectus quam id leo in. Purus in mollis nunc sed id. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.</p>",
  },
  {
    name: "Template 2",
    subject: "Test Email Template Again",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt praesent semper feugiat nibh sed. At augue eget arcu dictum varius duis. Imperdiet massa tincidunt nunc pulvinar sapien. Aliquam purus sit amet luctus. Vel facilisis volutpat est velit egestas dui. Sed arcu non odio euismod lacinia at quis. Consequat nisl vel pretium lectus quam id leo in. Diam phasellus vestibulum lorem sed. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Magna etiam tempor orci eu lobortis elementum nibh. Tempor orci eu lobortis elementum nibh. In hac habitasse platea dictumst quisque sagittis. Sollicitudin ac orci phasellus egestas tellus rutrum. Dignissim diam quis enim lobortis. Magna sit amet purus gravida quis blandit turpis cursus. Amet consectetur adipiscing elit pellentesque habitant morbi tristique. Habitant morbi tristique senectus et.<br/><br/>Vitae auctor eu augue ut lectus. Porta nibh venenatis cras sed felis eget velit. Nunc sed velit dignissim sodales ut. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Volutpat est velit egestas dui id ornare arcu odio ut. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Nisi lacus sed viverra tellus in. Nisi scelerisque eu ultrices vitae. Risus ultricies tristique nulla aliquet. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Eu mi bibendum neque egestas congue quisque. In vitae turpis massa sed elementum tempus egestas. Mi bibendum neque egestas congue. In vitae turpis massa sed elementum tempus egestas. Lectus quam id leo in. Purus in mollis nunc sed id. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.</p>",
  },
];
const EmailTemplates = () => {
  const handleNewTemplate = () => {
    console.log("yey");
  };

  return (
    <LoggedSection>
      <div className="flex mt-4 max-md:items-center justify-between mb-8">
        <div>
          <span className="flex gap-2">
            <p className="hidden md:block">Prospects / </p>
            <p className="text-[#41B2E9] text-xl md:text-base">
              Email Templates
            </p>
          </span>
        </div>
        <Button type="button" variant="lightBlue" onClick={handleNewTemplate}>
          New Template
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {TEMPLATES.map((template, index) => (
          <EmailTemplateCard template={template} key={index} />
        ))}
      </div>
    </LoggedSection>
  );
};

export default EmailTemplates;
