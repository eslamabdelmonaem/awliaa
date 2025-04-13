import { Form, FormInstance, Input, Select } from 'antd';
import { useStepperContext } from '../../contexts/StepperContext';
import { useTranslation } from 'react-i18next';
import useGetCountries from '@component/hooks/useGetCountries';
import useGetCities from '@component/hooks/useGetCities';
import useAddGroomPersonalInfo from '@component/hooks/useAddGroomPersonalInfo';
import { useAuth } from '@component/contexts/AuthContext';
import { UserRole } from '@component/types/user';
import useAddParentPersonalInfo from '@component/hooks/useAddParentPersonalInfo';
import { RelationStatus } from '@component/types/user-details';

export type UserResidence = {
  girlName?: string;
  relationship?: RelationStatus;
  note?: string;
  nationality: string;
  country: string;
  city: string;
};
export default function GeneralInformation({ form }: { form: FormInstance }) {
  const { updateStepData, currentStep, setCurrentStep } = useStepperContext();
  const { token, user } = useAuth();
  const handleSuccess = () => {
    setCurrentStep(currentStep + 1);
  };
  const { groomPersonalInfoMutation } = useAddGroomPersonalInfo(handleSuccess, token);
  const { parentPersonalInfoMutation } = useAddParentPersonalInfo(handleSuccess, token);
  const { t: translate, i18n } = useTranslation('common');
  const selectedCountryId = Form.useWatch('country', form);
  const selectedRelation = Form.useWatch('relationship', form);
  const { countries } = useGetCountries(token);
  const { cities } = useGetCities(selectedCountryId, token);
  const relationOptions = Object.values(RelationStatus);
  const onFinish = async (values: UserResidence) => {
    const selectedCountry = countries?.find((country) => country.id.toString() === values.country);
    const selectedNationality = countries?.find((country) => country.id.toString() === values.nationality);
    const selectedCity = cities?.find((city) => city.id.toString() === values.city);
    const countryName = selectedCountry ? selectedCountry.name_en : '';
    const cityName = selectedCity ? selectedCity.name_en : '';
    const personNationality = selectedNationality ? selectedNationality.name_en : '';
    const baseData = {
      nationality: personNationality,
      country: countryName,
      city: cityName,
    };
    if (user?.authorities?.some((auth) => auth.name === UserRole.GROOM)) {
      updateStepData(baseData);
      await groomPersonalInfoMutation.mutateAsync(baseData);
    } else {
      const extendedData = {
        ...baseData,
        name: values.girlName,
        relationship: values.relationship,
        note: values.note,
      };
      updateStepData(extendedData);
      await parentPersonalInfoMutation.mutateAsync(extendedData);
    }
  };
  return (
    <Form onFinish={onFinish} requiredMark={false} form={form} layout="vertical" className="form-container">
      {user?.authorities?.some((auth) => auth.name === UserRole.PARENT) && (
        <div className="form-item-wrapper w-[100%]">
          <Form.Item
            className="user-info-input w-[50%]"
            label={translate('girl name')}
            name="girlName"
            rules={[{ required: true, message: translate('please enter girl name') }]}>
            <Input className="user-info-input" placeholder={translate('enter girl name')} />
          </Form.Item>
          <Form.Item
            label={translate('relationship')}
            name="relationship"
            rules={[{ required: true, message: translate('please select relationship') }]}
            className={`user-info-select ${selectedRelation === RelationStatus.OTHER ? 'w-[25%]' : 'w-[50%]'}`}>
            <Select placeholder={translate('choose relationship')}>
              {relationOptions.map((relation) => (
                <Select.Option key={relation} value={relation}>
                  {translate(relation.toLowerCase())}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {selectedRelation === RelationStatus.OTHER && (
            <Form.Item
              label={translate('enter relationship')}
              className="w-[25%]"
              name="note"
              rules={[{ required: true, message: translate('please specify other relation') }]}>
              <Input className="user-info-input" placeholder={translate('enter relationship')} />
            </Form.Item>
          )}
        </div>
      )}
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          label={translate('nationality')}
          name="nationality"
          rules={[{ required: true, message: translate('please select your nationality') }]}
          className="user-info-select w-[50%]">
          <Select
            showSearch
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toString()
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toString().toLowerCase())
            }
            placeholder={translate('nationality')}>
            {countries &&
              countries.map((country) => (
                <Select.Option
                  key={country.code}
                  value={country.id}
                  label={i18n.language === 'ar' ? country.name_ar : country.name_en}>
                  {i18n.language === 'ar' ? country.name_ar : country.name_en}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={translate('residence country')}
          name="country"
          className="user-info-select w-[50%]"
          rules={[{ required: true, message: translate('please select country') }]}>
          <Select
            direction={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            showSearch
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toString()
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toString().toLowerCase())
            }
            placeholder={translate('residence country')}>
            {countries &&
              countries.map((country) => (
                <Select.Option
                  key={country.code}
                  value={country.id}
                  label={i18n.language === 'ar' ? country.name_ar : country.name_en}>
                  {i18n.language === 'ar' ? country.name_ar : country.name_en}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      <Form.Item
        rules={[{ required: true, message: translate('please select city') }]}
        label={translate('residence city')}
        name="city"
        className="user-info-select w-[50%]">
        <Select
          direction={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          showSearch
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toString()
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toString().toLowerCase())
          }
          placeholder={translate('residence city')}>
          {cities &&
            cities.map((city) => (
              <Select.Option
                key={city.code}
                value={city.id}
                label={i18n.language === 'ar' ? city.name_ar : city.name_en}>
                {i18n.language === 'ar' ? city.name_ar : city.name_en}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
