-- Optional seeds (edit freely)
insert into public.categories (label) values
  ('Moving Software & CRM'),
  ('Moving Sales Solutions'),
  ('Marketing / Advertising'),
  ('Moving Insurance'),
  ('Moving Equipment'),
  ('Apps & Online Tools'),
  ('Moving Leads');

insert into public.providers (name, website, summary, is_active, is_featured)
values ('MoveMan', 'https://www.moveman.co.uk', 'UK-based moving CRM', true, true);
