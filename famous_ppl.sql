drop schema if exists people cascade;
create schema people;
set search_path to people;

create table famous_people (
  pid serial primary key,
  first varchar(50) not null,
  last varchar(50) not null,
  dob date not null
);

insert into famous_people values('0001', 'Abraham', 'Lincoln', '1809-02-12');
insert into famous_people values('0002', 'Marilyn', 'Monroe', '1926-02-12');
insert into famous_people values('0003', 'Mother', 'Teresa', '1910-02-12');
insert into famous_people values('0004', 'Nelson', 'Mandela', '1918-02-12');
insert into famous_people values('0005', 'Bill', 'Gates', '1955-02-12');
insert into famous_people values('0006', 'Lincoln', 'Steffens', '1866-02-12');